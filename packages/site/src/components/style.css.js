import { style } from '@vanilla-extract/css';

export const headerCassName = style({
  display: 'flex',
  alignItems: 'center',
  width: '80vw',
  maxWidth: 860,
  margin: '0 auto',
  flexDirection: 'column',
  marginBottom: 40,
})

export const navigationClassName = style({
  flex: 1,
  textAlign: 'right',

})

export const navigationItemClassName = style({
  margin: '0 20px',
  textDecoration: 'none',
  fontWeight: 300,
  fontSize: 18,
  color: '#114c87',
  selectors: {
    '&[data-active=true]': {
      fontWeight: 600,
    }
  }
})