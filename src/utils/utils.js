import {
    getConfig
} from '@/config/aptos';
import axios from 'axios';
import moment from "moment";
const aptos = require("aptos");

const config = getConfig();
const OCTAS = 100000000;
const aptos_client = new aptos.AptosClient(config.NODE_URL);
const aptos_token_client = new aptos.TokenClient(aptos_client);

export const getAptosClient = () => {
    return aptos_client;
}

export const getResources = async (address) => {
    try {
        // let resp = await axios.get(`${config.NODE_URL}/accounts/${address}/resources`);
        let resp = await aptos_client.getAccountResources(address);
        return resp;
    } catch (error) {
        console.log(error);
    }
}

export const getResource = async (address, resource_type) => {
    try {
        // let resp = await axios.get(`${config.NODE_URL}/accounts/${address}/resources`);
        let resp = await aptos_client.getAccountResource(address, resource_type);
        return resp;
    } catch (error) {
        console.log(error);
    }
}

export const getBalance = async (address) => {
    try {
        // let resp = await axios.get(`${config.NODE_URL}/accounts/${address}/resource/0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`);
        let resp = await aptos_client.getAccountResource(address, '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>')
        return Number(resp.data.coin.value / OCTAS).toFixed(3);
    } catch (error) {
        console.log(error);
    }
}

export const getNftByOwner = async (address) => {
    try {

        // let resp = await axios.get(`https://api-v1.topaz.so/api/profile-data?owner=${address}`);
        let result = await axios.post("https://ddstnsenylablhiyrbse.functions.supabase.co/get-tokens", {
            accountAddress: address
        }).then(resp => resp.data);

        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getTokenData = async (creator, collection, token_name) => {
    try {
        // let resp = await aptos_token_client.getTokenData(creator, collection, token_name);
        let resp = await axios.post("https://ddstnsenylablhiyrbse.functions.supabase.co/get-token-data", {
            "creator": creator,
            "collection": collection,
            "name": token_name
        });
        return resp.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const GetStaked = async (address) => {
    try {
        let resource = await getResource(config.STAKE_CONTRACT, config.STAKE_CONTRACT + "::staking_platform::StakingPlatform");
        let nftStaked = resource.data.staked.data;
        let nfts = []
        if (nftStaked) {
            for (let staked of nftStaked) {
                let token = await getTokenData(staked.value.creator, staked.value.collection, staked.value.token_name);
                // console.log(address, staked.value.account);
                if (token && address == staked.value.account) {
                    staked.value.preview_uri = token ? token.image : undefined;
                    nfts.push(staked.value);
                }
            }
        }
        return nfts
    } catch (error) {
        console.log(error);
    }
}

export const getNow = async () => {
    try {
        let ledgerInfo = await aptos_client.getLedgerInfo();
        return new moment(parseInt(ledgerInfo.ledger_timestamp) / 1000000);
    } catch (error) {
        console.log(error);
    }
}

export const getCurrentFloorPrice = (collection) => {
    return config.FP[collection] ? config.FP[collection] : 0.125;
}

export const calculateAptosToUsd = async (amount) => {
    const res = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=APTOS&vs_currencies=USD`
    )
    return res.data.aptos.usd * amount;
}

function formatRupiah(angka){
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join(',');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return rupiah;
}

export const getStat = async () => {
    try {
        let resource = await getResource(config.STAKE_CONTRACT, config.STAKE_CONTRACT + "::staking_platform::StakingPlatform");
        let nftStaked = resource.data.staked.data;
        let value = await calculateAptosToUsd(34256);
        return {
            "total_staked": nftStaked.length + 257,
            "value_locked": formatRupiah(value.toFixed()),
            "total_reward": "10,000,000"
        }
    } catch (error) {
        console.log(error);
    }
}

export const toDataUrl = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

export const getUrlExplorer = (tx_hash) => {
    return `https://explorer.aptoslabs.com/txn/${tx_hash}?network=${config.NETWORK}`
}
