import Asset from "../models/assetModels.js";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

// Criar ativos (permitindo um ou mais ativos)
export const createAssets = asyncHandler(async (req, res) => {
  // Verifica erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Verifica se a requisição contém um array ou um único ativo
  let assets = req.body;
  
  // Se não for um array, transforma em um array de um único ativo
  if (!Array.isArray(assets)) {
    assets = [assets];
  }

  // Validar se há ativos na requisição
  if (assets.length === 0) {
    return res.status(400).json({ message: "É necessário enviar pelo menos um ativo." });
  }

  // Checa se algum ativo já existe pela tag (única) e envia erro se já existir
  for (const asset of assets) {
    const { tag } = asset;
    const existingAsset = await Asset.findOne({ tag });
    if (existingAsset) {
      return res.status(400).json({ message: `Já existe um ativo com a tag ${tag}.` });
    }
  }

  // Criar múltiplos ativos
  try {
    const savedAssets = await Asset.insertMany(assets);
    res.status(201).json(savedAssets);  // Retorna os ativos criados
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar múltiplos ativos." });
  }
});

// Obter todos os ativos
export const getAllAssets = asyncHandler(async (req, res) => {
  const assets = await Asset.find().lean(); // `lean()` melhora a performance para leitura
  res.status(200).json(assets);
});

// Obter um ativo por ID
export const getAssetById = asyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id);
  if (!asset) {
    return res.status(404).json({ message: "Ativo não encontrado." });
  }
  res.status(200).json(asset);
});

// Atualizar um ativo por ID
export const updateAssetById = asyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id);
  if (!asset) {
    return res.status(404).json({ message: "Ativo não encontrado." });
  }

  // Atualiza os campos
  Object.assign(asset, req.body);
  const updatedAsset = await asset.save();
  res.status(200).json(updatedAsset);
});

// Excluir um ativo por ID
export const deleteAssetById = asyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id);
  if (!asset) {
    return res.status(404).json({ message: "Ativo não encontrado." });
  }

  await asset.deleteOne();
  res.status(200).json({ message: "Ativo excluído com sucesso." });
});