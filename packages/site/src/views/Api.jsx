import React from 'react'
import styled from 'styled-components'
import apiDescription from '../api.json'

const PropertyWrapper = styled.div`
  padding-top: 100px;
  margin-bottom: 30px;
`

const List = styled.div``

const ListItem = styled.div`
  margin-bottom: 30px;
`

const ListColumn = styled.div``

const ListTitle = styled.div`
  display: flex;
  margin-bottom: 10px;
`

const PropertyName = styled.span`
  display: inline-block;
  font-weight: 600;
  margin-right: 20px;
`

const PropTitle = styled.div`
  font-weight: 600;
  font-size: 1.5em;
  margin-bottom: 30px;
`

const PropertyType = styled.span`
  display: inline-block;
  margin-right: 10px;
`

const PropertyDefault = styled.span`
  font-style: italic;
`

const Interface = ({ node }) => {
  return (
    <PropertyWrapper key={node.name}>
      <PropTitle id={node.id}>{node.name}</PropTitle>
      {node.children && (
        <List>
          {node.children?.map?.((child) => {
            return (
              <ListItem key={child.name}>
                <ListTitle>
                  <PropertyName>{child.name}</PropertyName>
                  <PropertyType>
                    {child?.type?.id ? (
                      <a href={`#${child?.type?.id}`}>{child?.type?.name}</a>
                    ) : (
                      child?.type?.name
                    )}
                  </PropertyType>
                  <PropertyDefault>
                    {
                      child.comment.tags.find((tag) => tag.tag === 'default')
                        ?.text
                    }
                  </PropertyDefault>
                </ListTitle>

                <ListColumn>{child?.comment?.shortText}</ListColumn>
              </ListItem>
            )
          })}
        </List>
      )}
    </PropertyWrapper>
  )
}

const TypeAliasWrapper = styled.div`
  display: flex;
`

const TypeAliasTitle = styled.div`
  font-weight: 600;
  font-size: 1.2em;
  margin-right: 20px;
  margin-bottom: 20px;
`

const TypeAlias = ({ node }) => {
  let typeElements = null

  switch (node.type.type) {
    case 'intrinsic':
      typeElements = node.type.name
      break
    case 'union':
      typeElements = node.type.types.map((type, index) => (
        <a key={type.id} href={`#${type.id}`}>
          {index !== 0 && ' | '}
          {type.name}
        </a>
      ))
      break
    case 'reflection':
      typeElements = (
        <code>
          {'{'}
          {node.type.declaration.children
            .map((item) => ` ${item.name}: ${item.type.name}, `)
            .join('')}
          {'}'}
        </code>
      )
  }

  return (
    <TypeAliasWrapper id={node.id}>
      <TypeAliasTitle>{node.name}</TypeAliasTitle>
      <div>{typeElements}</div>
    </TypeAliasWrapper>
  )
}

const Wrapper = styled.div`
  max-width: 860px;
  margin: 0 auto 50px;
`

export const Api = () => {
  console.log({ apiDescription })
  return (
    <Wrapper>
      {apiDescription.children.map((node) => {
        switch (node.kindString) {
          case 'Interface':
            return <Interface key={node.name} node={node} />
          case 'Type alias':
            return <TypeAlias key={node.name} node={node} />
          default:
            return <div key={node.name}>none</div>
        }
      })}
    </Wrapper>
  )
}
