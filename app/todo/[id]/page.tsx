import TodoDetail from "../_components/todo-detail";

export default async function HalamanDetailTodo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <TodoDetail id={id} />;
}
