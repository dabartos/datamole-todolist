import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled from "styled-components";

import { Checkbox } from "./Checkbox";
import { Form } from "./form";
import Button from "./Button";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    margin: 5px;
    padding: 5px;
    gap: 10px;

    &:hover .controls {
        visibility: visible;
    }

    & button[role="checkbox"] {
        flex-shrink: 0;
    }

    & .controls {
        visibility: hidden;
        margin-inline-start: auto;
        display: flex;
        gap: 5px;
    }

    
`;

const Label = styled.label`
    margin-left: 15px;
`;

export type LiteeItemProp = {
    label: string;
    isDone: boolean;
    onItemLabelEdit: (label: string) => void;
    onItemDoneToggle: (isDone: boolean) => void;
    onItemDelete: () => void;
};

export const ListItem = (props: LiteeItemProp) => {
    const { label, isDone, onItemLabelEdit, onItemDoneToggle, onItemDelete } = props;

    const [editingLabel, setEditingLabel] = useState(false)
    const toggleForm = () => setEditingLabel(oldState => !oldState);
    const onSubmit = (newLabel: string) => {
        onItemLabelEdit(newLabel);
        toggleForm();
    }

    return (
        <StyledDiv>
            <Checkbox checked={isDone} onCheckedChange={onItemDoneToggle} />
            {!editingLabel && (
                <>
                    <Label>{label}</Label>
                    <span className="controls">
                        <Button onClick={() => onItemDelete()}>
                            <TrashIcon />
                        </Button>
                        <Button onClick={toggleForm}>
                            <Pencil1Icon />
                        </Button>
                    </span>
                </>
            )}
            {editingLabel && (
                <Form initialValue={label} onCancel={toggleForm} onSubmit={onSubmit} />
            )}
        </StyledDiv>
    );
};
