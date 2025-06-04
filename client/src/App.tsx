import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { ListItem } from "./components/ListItem";
import useToDoList from "./hooks/useToDoList";
import { Form } from "./components/form";

export const App = () => {

    const { items, todoItems, doneItems, onItemAdd } = useToDoList()

    return (
        <ThemeProvider>
            <Container>
                <Layout>
                    <Header onItemAdd={onItemAdd}>To Do app</Header>
                    <List>
                        {items.sort((a, b) => {
                            if (a.isDone !== b.isDone) {
                                return a.isDone ? 1 : -1;
                            }

                            return (b.createdAt || 0) - (a.createdAt || 0);
                        }).map(item =>
                            <ListItem {...item} key={item.id} />
                        )}
                    </List>
                    <Footer todoItems={todoItems} doneItems={doneItems}/>
                </Layout>
            </Container>
        </ThemeProvider>
    );
}

