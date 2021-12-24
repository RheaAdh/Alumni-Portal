import { useState } from "react";

const useForceUpdate = () => {
    const [, setValue] = useState(false);
    return () => setValue((prev) => !prev);
};

export default useForceUpdate;
