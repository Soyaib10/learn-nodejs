import { Router } from "express";

const router = Router()

// ------------Get-------------
router.get("/api/products", (req, res) => {
    console.log(req.header.cookie)
    console.log(req.cookies)
    if (req.cookies.hello && req.cookies.hello === "world") {
        return res.send([{ id: 123, name: "chicken brest", price: 12.00 }]);
    }
    return res.send("Sorry, you need to send correct cookies")
});

export default router