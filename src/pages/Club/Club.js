import React, { useState, } from 'react';

import {SimpleGrid, Container} from "@chakra-ui/react";
import CardBanner from 'components/Card/CardBanner';
import { getDocs, collection} from "firebase/firestore";
import { db } from "components/firebase/firebase-config";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardComp from "components/Card/Card";
// import { useIsMounted } from 'components/LifeCycle/lifecycle';
import Loading from 'components/Loading/Loading';

export default function Club({clubs, isLogged, setClubs, projects, setProjects, userData}) {
    const { clubsId } = useParams();
    const selectedClub = parseInt(clubsId);
    const e = clubs[selectedClub - 1];
    const fetchProjects = async () =>{
      const queryCollection = collection(db, "Clubs");
      await getDocs(queryCollection)
        .then(async (querySnapshot)=>{     
            const clubsRes = querySnapshot.docs.map((club) => (club.data()))
            setClubs(clubsRes)
            const projectRes = await getDocs(collection(db,`Clubs/${selectedClub}/Projects`)).then(res=>res.docs.map(project=>(project.data())))
            setProjects(projectRes)
        })
    }
      useEffect(()=>{
          setProjects([])
          fetchProjects();
      }, [])
    return (    
            <Container
            size="md"
            pt={{ base: "5rem", md: "8.125rem" }}
            pb={{ base: "2.75rem", md: "4.5rem", xl: "7.75rem" }}
          style={{paddingTop:'10px'}}>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(100%, 100%))' justifyContent={'center'}>
                    {e ? <CardBanner key={e.id} dep={e.Departament} club={e.Emri} img={e.Imazh} linkId={e.id} isLogged={isLogged} selectedClub={selectedClub} userData={userData}/> :<Loading/>}
                </SimpleGrid>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 286px))' justifyContent={'center'}>
                {projects ? projects.map((ele, i)=>(<CardComp key={i} projects={projects} images={ele.Images} club={e.Emri} dep={e.Departament} textArr={ele.Description} name={ele.Name} code={ele.code}/>)) : <Loading/>}
            </SimpleGrid>
            </Container>
      )
}
