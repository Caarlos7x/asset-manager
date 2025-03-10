import jwt from 'jsonwebtoken';  // Substituir 'require' por 'import'

// Função de middleware para autenticação JWT
export const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: "Acesso não autorizado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido" });
    }
};
