import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
    hostname: {
        type: String,
        required: [true, 'O hostname é obrigatório'],
        trim: true,
    },
    tag: {
        type: String,
        required: [true, 'Obrigatório informar a tag do ativo'],
    },
    lastUserLogon: {
        type: String,
    },
    domain: {
        type: String,
    },
    manufacturer: {
        type: String,
    },
    model: {
        type: String,
    },
    serialNumber: {
        type: String,
    },
    os: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;