import React from "react";
import { Skeleton } from 'antd';
export default function Loading() {
    return (
        <div className="centrarProgress">
         <Skeleton active />
        </div>
    );
}