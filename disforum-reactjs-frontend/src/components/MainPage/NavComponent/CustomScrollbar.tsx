import './CustomScrollbar.css'


const CustomScrollBar = (props:any) => {
    const { children } = props;
    return (
        <div className="scrollbar custom-scrollbar h-full w-full flex justify-evenly items-center flex-wrap overflow-y-auto overscroll-contain">

            {children}

        </div>
    );
};

export default CustomScrollBar;
