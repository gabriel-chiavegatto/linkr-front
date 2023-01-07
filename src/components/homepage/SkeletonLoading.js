import { Skeleton } from '@mui/material'
import styled from 'styled-components'

function SkeletonLoading() {
  return (
    <SkeletonContainer>
      <ContainerSkeletonPhoto>
        <Skeleton sx={{bgcolor: 'grey.900'}} variant='circular' width={50} height={50}/>
      </ContainerSkeletonPhoto>
      <ContainerSkeletonPost>
        <Skeleton sx={{bgcolor: 'grey.900'}} variant='rectangular' width={475} height={50}/>
        <Skeleton sx={{bgcolor: 'grey.900'}} variant='rectangular' width={475} height={150}/>
      </ContainerSkeletonPost>
    </SkeletonContainer>
  )
}

export default SkeletonLoading

const SkeletonContainer = styled.div`
    width: 50%;
    height: 30vh;
    display: flex;
    padding: 10px;
    gap: 10px;
`

const ContainerSkeletonPhoto = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ContainerSkeletonPost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`