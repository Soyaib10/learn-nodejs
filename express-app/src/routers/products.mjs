import { Router } from "express";

const router = Router()

// ------------Get-------------
router.get("/api/products", (req, res) => {  
    res.send([
        { id: 123, name: "chicken brest", price: 12.00 }
    ]);
});

export default router