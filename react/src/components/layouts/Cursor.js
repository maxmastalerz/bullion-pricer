import React, { useEffect, useState } from 'react';

const Cursor = () => {
    const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({
                top: e.pageY,
                left: e.pageX
            });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []); // Empty dependency array ensures the effect runs only once

    return <div style={{ top: cursorPosition.top, left: cursorPosition.left }} className="circle-out"></div>;
};

export default Cursor;