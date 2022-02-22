import { chdir } from 'process'
import React from 'react'
import styled from 'styled-components'
import apiDescription from '../api.json'

const Wrapper = styled.div`
  max-width: 650px;
  margin: 0 auto;
`

const PropertyWrapper = styled.div`
  margin-bottom: 30px;
`

const List = styled.div``
const ListHead = styled.div`
  display: grid;
  grid-template-columns: 150px 150px 1fr;
  font-weight: 600;
`
const ListBody = styled.div`
  display: grid;
  grid-template-columns: 150px 150px 1fr;
`
const ListColumn = styled.div`
  padding: 10px;
  word-break: break-all;
`

const PropertyName = styled.span`
  display: inline-block;
  font-weight: 600;
`

const PropTitle = styled.div`
  font-weight: 600;
  font-size: 1.5em;
  margin-bottom: 30px;
`

export const Api = () => {
  console.log({ apiDescription })
  return (
    <Wrapper>
      {apiDescription.children.map((node) => (
        <PropertyWrapper key={node.name}>
          <PropTitle id={node.id}>{node.name}</PropTitle>
          {node.children && (
            <List>
              <ListHead>
                <ListColumn>name</ListColumn>
                <ListColumn>type</ListColumn>
                <ListColumn>description</ListColumn>
              </ListHead>
              <ListBody>
                {node.children?.map?.((child) => {
                  return (
                    <>
                      <ListColumn>
                        <PropertyName>{child.name}</PropertyName>
                      </ListColumn>
                      <ListColumn>
                        {child?.type?.id ? (
                          <a href={`#${child?.type?.id}`}>
                            {child?.type?.name}
                          </a>
                        ) : (
                          child?.type?.name
                        )}
                      </ListColumn>
                      <ListColumn>{child?.comment?.shortText}</ListColumn>
                    </>
                  )
                })}
              </ListBody>
            </List>
          )}
        </PropertyWrapper>
      ))}
    </Wrapper>
  )
}
