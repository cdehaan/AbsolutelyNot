import { useState } from "react";
import { Player } from "./types";

const useUserData = () => {
    const [data, setData] = useState<Player>({
        playerKey:   null,
        name:        'anonymous',
        picture:     null,
        secret:      null,
        gameKey:     null,
        lastAction:  null,
        active:      false
      });
  
    // TODO logic for managing or updating this data
  
    return [data, setData];
}

export default useUserData