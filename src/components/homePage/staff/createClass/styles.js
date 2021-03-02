import styled from "styled-components";

export const StyledSection = styled.section`
    background: #f5f5f5;
    overflow: hidden;
    padding: 24px;
    .courseOutline {
        margin: 2rem 0;
    }

    .cardContent {
        margin: 0px;
        padding: 20px;
    }

    .previewContainer {
        background: #fff;
        padding: 16px;
    }

    .card-container p {
        margin-bottom: 10px;
    }

    .card-container > .ant-steps-item-wait,
    .ant-steps-item-container,
    .ant-steps-item-content,
    .ant-steps-item-title {
        font-size: 0.85rem;
        padding-bottom: 6px;
    }

    .card-container > .ant-steps-item-icon {
        width: 1em;
    }

    .card-container > .ant-tabs-card .ant-tabs-content {
        min-height: 77.8vh;
        margin-top: -16px;
    }

    .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
        background: #fff;
        padding: 16px;
    }

    .card-container > .ant-tabs-card > .ant-tabs-nav::before {
        display: none;
    }

    .card-container > .ant-tabs-card .ant-tabs-tab,
    [data-theme="compact"] .card-container > .ant-tabs-card .ant-tabs-tab {
        border-color: transparent;
        background: transparent;
    }

    .card-container > .ant-tabs-card .ant-tabs-tab-active,
    [data-theme="compact"] .card-container > .ant-tabs-card .ant-tabs-tab-active {
        border-color: #fff;
        background: #fff;
    }

    [data-theme="compact"] .card-container > .ant-tabs-card .ant-tabs-content {
        height: 120px;
        margin-top: -8px;
    }

    [data-theme="dark"] .card-container > .ant-tabs-card .ant-tabs-tab {
        border-color: transparent;
        background: transparent;
    }

    [data-theme="dark"] #components-tabs-demo-card-top .code-box-demo {
        background: #000;
    }

    [data-theme="dark"]
        .card-container
        > .ant-tabs-card
        .ant-tabs-content
        > .ant-tabs-tabpane {
        background: #141414;
    }

    [data-theme="dark"] .card-container > .ant-tabs-card .ant-tabs-tab-active {
        border-color: #141414;
        background: #141414;
    }

    .ant-steps {
        padding-top: 20px;
    }

`;

export const TabsContent = styled.div`
margin: "0 20px";
`;

export const HeaderStyle = styled.div`
padding: 20px;
`;

export const AddAssignmentStyle = styled.div`
display: flex; 
justify-content: flex-end; 
align-items: center;
padding: 0 10px;
p{
  margin: 10px; 
  padding: 10px;
}

@media (max-width: 576px) {
  justify-content: flex-start; 
  ${'' /* justify-content: center;  */}
}
`;

export const DropDownStyle = styled.div`
display: flex;
justify-content: flex-end;
padding: 10px; 

@media (max-width: 576px) {
  justify-content: flex-start; 
  ${'' /* justify-content: center;  */}
  margin-left: 20px;
}
`;

export const StyledDivSummary = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 20px;

    button {
    }
`;