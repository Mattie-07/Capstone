import styled from "styled-components";

export const DivSC = styled.div`
  background-color: ${props => props.bgc || "purple"};
  width: 400px;
  height: 400px;
  color: white;
`;


export const H1S = styled.h1`
  text-align:center;
  color: purple;

`;



export const Paper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  position:relative;
  background-color: ${props => props.bgc || "white"};
  height: ${props => props.height || "525px"};
  width: ${props => props.width || "300px"};
  margin-top:50px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  margin-bottom:20px;
  
`;



export  const  Container  =  styled.div`
  justify-content: center;
  margin: 0  auto;`
  

  export const Form = styled.form`





`;

export const Card = styled.div`






`;
