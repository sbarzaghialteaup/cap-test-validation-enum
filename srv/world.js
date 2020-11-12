module.exports = (say) => {
    say.on("hello", async (req) => {
        const catalogService = cds.services["CatalogService"];

        const tx = catalogService.transaction(req);

        try {
            const Books = catalogService.entities.Books;

            await tx.create(Books).entries({
                enum: "T",
                author_ID: req.data.author,
            });

            await tx.commit();

            return "OK";
        } catch (error) {
            console.error("Validation or on commit error", error);
            await tx.rollback();

            const Logs = catalogService.entities.Logs;

            const txLogs = catalogService.transaction(req);

            await txLogs.create(Logs).entries({
                error: JSON.stringify(error),
            });

            await txLogs.commit();

            req.reject(400, error);
        }
    });
};
