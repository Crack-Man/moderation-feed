class BulletinsController {
    async getData(req, res) {
        try {
            const db = req.db;

            const sql = `SELECT
                id,
                publishDate,
                publishDateString,
                ownerId,
                ownerLogin,
                bulletinSubject,
                bulletinText,
                bulletinImages
                FROM bulletins
            WHERE decision IS NULL LIMIT 10;`;

            db.all(sql, [], (err, data) => {
                if (err) {
                    res.status(400).json({error: err.message});
                    return;
                }
                res.json(data);
            });
        } catch (e) {
            console.log(e);
            res.status(500).send("Internal server error");
        }
    }

    async setDecisions(req, res) {
        try {
            const db = req.db;
            const bulletins = req.body.bulletins;

            const ids = [];
            const sqlDecision = [];
            const sqlDeclineReason = [];
            const sqlEscalateNote = [];

            const values = [];

            bulletins.forEach(bulletin => {
                sqlDecision.push(`WHEN ? THEN ?`);

                values.push(bulletin.id, bulletin.decision);
            });
            bulletins.forEach(bulletin => {
                sqlDeclineReason.push(`WHEN ? THEN ?`);

                values.push(bulletin.id, bulletin.declineReason || null);
            });
            bulletins.forEach(bulletin => {
                sqlEscalateNote.push(`WHEN ? THEN ?`);

                values.push(bulletin.id, bulletin.escalateNote || null);

                ids.push(bulletin.id);
            });

            const sql = `UPDATE bulletins SET
                decision = CASE id ${sqlDecision.join(" ")} ELSE NULL END,
                declineReason = CASE id ${sqlDeclineReason.join(" ")} ELSE NULL END,
                escalateNote = CASE id ${sqlEscalateNote.join(" ")} ELSE NULL END
            WHERE id IN (${ids.map(() => '?').join(", ")})`;

            values.push(...ids);

            db.run(sql, values, function (err) {
                if (err) {
                    return console.error(err.message);
                }
                res.json({changes: this.changes});
            });
        } catch (e) {
            console.log(e);
            res.status(500).send("Internal server error");
        }
    }
}

module.exports = new BulletinsController();