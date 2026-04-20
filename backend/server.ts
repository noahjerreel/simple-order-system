import express, { Request, Response, NextFunction } from "express";
import orderRoute from "./production/routes/order.route";
import { ENV_CONSTANT } from "./configs/constants/app.constant"

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    next();
});

app.use(express.json());

orderRoute(app);

app.listen(ENV_CONSTANT.PORT, () => {
    console.log(`Server is running on http://localhost:${ENV_CONSTANT.PORT}`);
});

export default app;
