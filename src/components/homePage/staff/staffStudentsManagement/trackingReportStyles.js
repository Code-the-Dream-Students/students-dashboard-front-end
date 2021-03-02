import styled from "styled-components";

export const Square = styled.div`
        height: 20px;
        width: 20px;
        background-color: ${(props) => props.squareColor};
        border-color: #f00;
    `;

export const SquareDescription = styled.p`
    margin: 0;
    padding: 0;
`;

export const DivMargin = styled.div`
    margin: 10px;
`;

export const ContainerLegend = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`;

export const DivLegend = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 15px;
`;

export const StyledDate = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 10px;
    p {
        margin: 10px;
        padding: 10px;
    }

    @media (max-width: 576px) {
        justify-content: flex-start;
        ${"" /* justify-content: center;  */}
    }
`;