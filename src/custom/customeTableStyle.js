import { color } from "framer-motion";
import { footer } from "framer-motion/client";

const customStyles = {
    table: {
        style: { backgroundColor: "transparent" },
    },

    headRow: {
        style: {
            backgroundColor: "#155DFC",
            color: "#FFFFFF",
            fontWeight: "600",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            
        },
    },

    headCells: {
        style: {
            color: "#FFFFFF",
            fontSize: "14px",
        },
    },

    rows: {
        style: {
            backgroundColor: "#0D1D33",
            color: "#FFFFFF",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            transition: "all 0.18s ease",
        },
        highlightOnHoverStyle: {
            backgroundColor: "rgba(21, 93, 252, 0.18)",
            color: "#FFFFFF",
            cursor: "pointer",
        },
    },

    pagination: {
        style: {
            backgroundColor: "#0D1D33",
            color: "#FFFFFF",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            minHeight: "56px",
            paddingTop: "8px",
        },
        pageButtonsStyle: {
            color: "#FFFFFF",
            fill: "#FFFFFF",
            backgroundColor: "transparent",
            borderRadius: "6px",
            height: "36px",
            width: "36px",
            padding: "0",
            margin: "0 4px",
            "&:disabled": {
                color: "rgba(255,255,255,0.35)",
                fill: "rgba(255,255,255,0.35)",
            },
            "&:hover:not(:disabled)": {
                backgroundColor: "rgba(255,255,255,0.06)",
                transform: "translateY(-1px)",
            },
        },
    },

    footerRow: {
        style: {
            backgroundColor: "#0D1D33",
            color: "#FFFFFF",
            borderTop: "1px solid rgba(255,255,255,0.08)",
        },
    },
};


export default customStyles