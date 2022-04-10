import {useEffect, useRef, useState} from "react";
import {init, insert, startListener, all} from "../utils/instances";
import ChatComp from "../components/Chat";


export default function Chat() {
    return <div className={"bg-black mt-10 mb-10"}><ChatComp name={"Bhuvi 100"}></ChatComp></div>
}