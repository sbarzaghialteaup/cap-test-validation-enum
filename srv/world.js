module.exports = (say) => {
    say.on("hello", async (req) => {
        const tx = cds.transaction(req);

        try {
            const Books = cds.services["CatalogService"].entities.Books;

            await tx.create(Books).entries({
                enum: "T",
                author_ID: req.data.author,
            });

            await tx.commit();

            return "OK";
        } catch (error) {
            await tx.rollback();
            console.error("Validation or on commit error", error);
            return error.toString();
        }
    });
};
