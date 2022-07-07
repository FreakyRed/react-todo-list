import styling from "styled-components"

const Container = styling.div`
`

const TodoItem = ({data}) => {
    return <Container>{data.title}</Container>
}

export default TodoItem;