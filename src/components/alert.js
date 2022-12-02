import { getUrlExplorer } from "@/utils/utils";

export default function MessageSuccess({ tx_hash }) {
    return <div>
        <div>Transaction Success!</div>
        <div>
            <a href={getUrlExplorer(tx_hash)} target="_blank" rel="noreferrer" style={{ color: "blue" }}>{tx_hash.substring(0, 30)}...</a>
        </div>
    </div>
}