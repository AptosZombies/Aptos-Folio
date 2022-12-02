//import axios from 'axios';

const NETWORK = "mainnet"

export const getNode = (network) => {
    switch (network) {
        case "devnet":
            return "https://fullnode.devnet.aptoslabs.com/v1"
        case "testnet":
            return "https://fullnode.testnet.aptoslabs.com/v1"
        case "mainnet":
            return "https://fullnode.mainnet.aptoslabs.com/v1"
        default:
            return "https://fullnode.devnet.aptoslabs.com/v1"
    }
}

export const getFloorPrice = () => {
    return {
        "Aptos Monkeys": 1.5,
        "Spooks": 1,
        "VORP Pass": 0.8,
        "Aptomingos": 2.5,
        "Move Name Service V1": 0.5,
        "Bruh Bears": 0.85,
        "Pontem Space Pirates": 1.85,
        "AptoPunks": 0.45,
        "Aptos Undead": 1,
        "Gorilla Toolbox": 0.35,
        "Nevermores": 0.75,
        "Aptos (MOVE)Rs NFT": 1.2,
        "Bussin Boomers": 1,
        "Retro Boys Club": 1.2,
        "Aptos Rats": 0.85,
        "The Things": 0.35,
        "Aptos Toad Overload": 1.15,
        "Shikoku 四国区": 0.55,
        "Apetos Apes": 0.25
    }
}

export const getConfig = () => {
    return {
        NETWORK: NETWORK,
        NODE_URL: getNode(NETWORK),
        FP: getFloorPrice()
    }
}
