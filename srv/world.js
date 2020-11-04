module.exports = (say) => {
    say.on("hello", async (req) => {
        const tx = cds.transaction(req);

        try {
            const Books = cds.entities.Books;

            await tx.create(Books).entries({
                enum: "T",
            });

            await tx.commit();

            return "OK";
        } catch (error) {
            console.error("Validation or on commit error", error);
            return error.toString();
        }
    });
};
