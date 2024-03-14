checkAdminRole = (req, res, next) => {
    const user = req.user;
    
    if (user.role === "admin") {
        next();
    }
    
    res.status(403).json({
        message: "Nécessite admin"
    });
}