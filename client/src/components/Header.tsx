import { PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled from "styled-components";
import { Form } from "./form";

const StyledDiv = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        all: unset;
        display: flex;
        justify-content: center;
        align-items: center;

        width: 25px;
        height: 25px;

        background-color: ${(props) => props.theme.colors.grass9};
        border: 1px solid;
        border-color: ${(props) => props.theme.colors.olive9};
        border-radius: 50%;

        color: #fff;
    }
`;

type HeaderProps = {
    children: React.ReactNode;
    onItemAdd: (label: string) => void;
};

export const Header = (props: HeaderProps) => {
    const { children, onItemAdd } = props;
    const [addingItem, setAddingItem] = useState(false);

    const toggleForm = () => setAddingItem(oldState => !oldState);

    return (
        <StyledDiv>
            <h1>{children}</h1>
            {!addingItem && <button onClick={toggleForm}><PlusIcon /></button>}
            {addingItem && <Form initialValue="" onSubmit={onItemAdd} onCancel={toggleForm}/>}
        </StyledDiv>
    );
};
