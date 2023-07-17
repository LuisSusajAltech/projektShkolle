import React from 'react'
import CaptionCarousel from 'components/Carousel/carousel';
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Code
  } from '@chakra-ui/react';
  
  export default function CardComp({name, dep, club, textArr, images, threeD, code, projects}) {
    return (
      <Center py={12}>
        <Box
          role={'group'}
          p={6}
          maxW={'100%'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${images ? images[0] : ""})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            {<Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'contain'}
              src={images ? images[0] : ""}
            /> }
          </Box>
          <Stack pt={10} align={'center'} justifyContent={'flex-start'}>
            {/* <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              Brand
            </Text> */}
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} marginRight={'auto'}>
              {name}
            </Heading>
            <Stack direction={'row'} align={'center'} justifyContent={'flex-start'} width={'100%'}>
              <Text fontWeight={500} fontSize={'14px'}>
                Club :
              </Text>
              <Text fontWeight={600}>
              {club}
              </Text>
            </Stack>
            <Stack direction={'row'} align={'center'} justifyContent={'flex-start'} width={'100%'}>
              <Text fontWeight={500} fontSize={'14px'}>
                Dep :
              </Text>
              <Text fontWeight={600}>
              {dep && dep.length === 1 
                    ? dep[0] 
                    : dep.map((e, i)=>(i == 0 ? e  : ", " + e))
                  }
              </Text>
            </Stack>
            <Stack direction={'column'} align={'start'} justifyContent={'center'} width={'100%'}>
              <Text fontWeight={500} fontSize={'14px'}>
                Description
              </Text>
                  {textArr && textArr.length === 1 ? <Text fontWeight={600}>{textArr[0]}</Text> :textArr ?  textArr.map((e, i)=>(<Text fontWeight={600} key={i}>{e}</Text>)) : null}
            </Stack>
            <Stack direction={'row'} align={'center'} justifyContent={'flex-start'} width={'100%'}>
              <Text fontWeight={500} fontSize={'14px'}>
                Code
              </Text>
              <Text fontWeight={600}>
              <Code display={'block'}>{code}</Code>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    );
  }