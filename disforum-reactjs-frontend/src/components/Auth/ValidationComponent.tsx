interface fn {
    result: string;
}

export const ValidationComponent = (props:fn) => {
    return(
        <small className={"text-red-400 text-xs"}>
            {props.result}
        </small>
    )
}
