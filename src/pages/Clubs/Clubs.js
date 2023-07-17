import {SimpleGrid, Container} from "@chakra-ui/react";
// import CardComp from "components/Card/Card";
import CardBanner from "components/Card/CardBanner";
import React from 'react'
import { getDocs, collection } from "firebase/firestore";
import { db } from "components/firebase/firebase-config";
import { useEffect, } from "react";

// import { useIsMounted } from "components/LifeCycle/lifecycle";

export default function Clubs({clubs, setClubs, setSelectedClub, userData}) {
  // const isMounted = useIsMounted();
  const fetchClubs = async () => {
    await getDocs(collection(db, "Clubs"))
    .then((querySnapshot)=>{             
        const clubsRes = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id }));
          setClubs(clubsRes);
    })
  } 
  useEffect(()=>{
      fetchClubs();
  }, [])
  return (
    <Container
    size="md"
    pt={{ base: "5rem", md: "8.125rem" }}
    pb={{ base: "2.75rem", md: "4.5rem", xl: "7.75rem" }}
    style={{paddingTop:'10px'}} >
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 586px))' justifyContent={'center'}>
            {clubs && clubs.length && userData ? clubs.map((e, i)=>(<CardBanner key={i} dep={e.Departament} club={e.Emri} img={e.Imazh} linkId={e.id} setSelectedClub={setSelectedClub} userData={userData}/>)) : null}
        </SimpleGrid>
    </Container>
  )
}