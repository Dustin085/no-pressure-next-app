import { ReactQueryDevtoolPanel } from "@/devtools/react-query-devtools";

export function Devtools() {
    if (process.env.NODE_ENV !== "development") return null;

    return (
        <>
            <ReactQueryDevtoolPanel />
            {/* <OtherDevtool /> */}
        </>
    );
}
