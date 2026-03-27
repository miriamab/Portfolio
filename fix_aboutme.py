with open("app/components/sections/AboutMe.tsx", "w") as f:
    f.write('''"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AboutMe() {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  const handleBack = () => {
    setIsClosing(true);
    // Warte genau so lang wie die CSS Animation (0.6s)
    setTimeout(() => {
      // scroll: false wichtig, damit er nicht weicher hochscrollt
      router.push("/", { scroll: false });
    }, 600);
  };

  return (
    <>
      <style>{`
        @keyframes shrinkToBottom {
          0% { height: 100vh; }
          100% { height: 60px; }
        }
        
        .about-me-container {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100vw;
          min-height: 100vh;
          background-color: #451eff;
          color: #ffffff;
          z-index: 99995;
          overflow: hidden;
  with open("app/components/secnt    f.write('''"use client";
import { useRouter } from "neubimport { useRouter } from " fimport { useState } from "react";

export dfe
export default function AboutMen *  const router = useRouter();
  co    const [isClosing, setIsClowi
  const handleBack = () => {
    setIsClosing(true/}
    setIsClosing(true);
   la    // Warte genau so ai    setTimeout(() => {
      // scroll: false wichtig,        // scroll: falsle      router.push("/", { scroll: false });
    }, 600);
  };

  rCK    }, 600);
  };

  return (
    <>
    st  };

  ret.c
  ent    <>
         st        @keyfrxt          0% { height: 100vh; }
  s           100% { height: 60px;          }
        
        .abo s        n        sp          position: fixed;
 on          bottom: 0;
    l           left: 0;
er          right: tl          width: 1ep          min-height:             background-color:ea          color: #ffffff;
         oj          z-index: 99995            overflow: hidd a  with openproject organizatimport { useRouter } from "neubimport { useRouter } from " f-c
export dfe
export default function AboutMen *  const router = useRouter();
  co    const [i   export de    co    const [isClosing, setIsClowi
  const handleBack = () ={
  const handleBack = () => {
    se      setIsClosing(true/}
 "3re    setIsClosing(true)em   la    // Warte genaem      // scroll: false wichtig,        // scroll: e,    }, 600);
  };

  rCK    }, 600);
  };

  return (
    <>
    st  };

  ret.c
  ent    <>
    er  };

  rCK  
  rso  };

  return (  
  dex    <>
  ,
    ste
  ret.c
 wi  ent 80         srg  s           100% { height: 60px;          }
        
  "1        
        .abo s        n        sp   }       t: on          bottom: 0;
    l           left: 0;
er       03    l           left: "Fer          right: tl  ,
         oj          z-index: 99995            overflow: hid 1.11,
    color: "#ffffff",
  },
};
''')
