import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

setInterval(
    () => {
        https
            .get(`${process.env.API_URL}product/keepalive`, (res) => {
                if (res.statusCode === 200) {
                    console.log(
                        `[Keepalive] Success: API is alive at ${new Date().toISOString()}`,
                    );
                } else {
                    console.log(
                        `[Keepalive] Failed: API returned status ${res.statusCode} at ${new Date().toISOString()}`,
                    );
                }
            })
            .on('error', (e) => {
                console.error(
                    `[Keepalive] Error: ${e.message} at ${new Date().toISOString()}`,
                );
            });
    },
    0.2 * 60 * 1000,
);
