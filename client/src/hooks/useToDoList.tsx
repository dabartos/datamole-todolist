import { useCallback, useEffect, useState } from "react"
import { LiteeItemProp } from "../components/ListItem"

type TodoListItem = LiteeItemProp & { id: number, createdAt: number }

type UseToDoList = {
    items: TodoListItem[],
    todoItems: number,
    doneItems: number,
    onItemAdd: (label: string) => void
}

const useToDoList = (): UseToDoList => {

    const [todoItems, setToDoItems] = useState(0)
    const [doneItems, setDoneItems] = useState(0)
    const [items, setItems] = useState<TodoListItem[]>([])

    useEffect(() => {
        fetch('http://localhost:3000/items')
            .then(res => res.json())
            .then(data => {

                const newProps: TodoListItem[] = []
                let doneItems = 0;

                data.forEach((item: Record<string, any>) => {

                    if (item.isDone) {
                        doneItems++;
                    }

                    newProps.push(makeItemProps(item));
                })

                setDoneItems(doneItems)
                setToDoItems(data.length - doneItems)
                setItems(newProps)
            });
    }, [])

    const onItemLabelChanged = (id: number, newLabel: string) => {
        fetch(`http://localhost:3000/items/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label: newLabel })
        })
        .then(res => res.json())
        .then(data => {
            setItems(prevItems =>
                prevItems.map((item) =>
                    item.id === data.id ? makeItemProps(data) : item
                )
            );
        });
    }

    const onItemDoneChanged = (id: number, newState: boolean) => {
        fetch(`http://localhost:3000/items/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isDone: newState })
        })
        .then(res => res.json())
        .then(data => {
            setItems(prevItems =>
                prevItems.map((item) =>
                    item.id === data.id ? makeItemProps(data) : item
                )
            );

            setDoneItems(oldCount => newState ? ++oldCount : --oldCount);
            setToDoItems(oldCount => newState ? --oldCount : ++oldCount);
        });
    }

    const onItemAdd = (label: string) => {

        if (label === "") {
            return;
        }

        fetch('http://localhost:3000/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                createdAt: Date.now(),
                label,
                isDone: false
            }),
        })
        .then(res => res.json())
        .then(data => {
            const newItem = makeItemProps(data);
            setItems(prevItems => [...prevItems, newItem]);

            setToDoItems(oldCount => ++oldCount)
        });
    }

    const onItemDeleted = (id: number, isDone: boolean) => {

        fetch(`http://localhost:3000/items/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to delete a Todo item");
            return response.json();
        })
        .then(() => {
            setItems(prevItems => prevItems.filter(prevItem => prevItem.id !== id));

            if (isDone) {
                setDoneItems(oldCount => --oldCount);
            } else {
                setToDoItems(oldCount => --oldCount);
            }
        })
        .catch(error => console.error("Could not delete the todo item:", error));
    }

    const makeItemProps = (data: Record<string, any>): TodoListItem  => {
        const { id, label, isDone, createdAt } = data;

        return {
            id,
            label,
            isDone,
            createdAt,
            onItemLabelEdit: (newLabel: string) => onItemLabelChanged(id, newLabel),
            onItemDoneToggle: (isMarkedDone: boolean) => onItemDoneChanged(id, isMarkedDone),
            onItemDelete: () => onItemDeleted(id, isDone)
        };
    }

    return {
        items,
        todoItems,
        doneItems,
        onItemAdd
    }
}

export default useToDoList;
