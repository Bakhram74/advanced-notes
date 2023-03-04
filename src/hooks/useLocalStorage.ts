import {useEffect, useState} from "react";

export function useLocalStorage<T>(key: string, initValue: T | (() => T)) {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue == null) {
            if (typeof initValue === 'function') {
                return (initValue as () => T)()
            } else {
                return initValue
            }
        } else {
return  JSON.parse(jsonValue)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}