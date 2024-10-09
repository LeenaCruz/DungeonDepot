const StoreComponent = ({ storeId }) => {
    const { loading, error, data } = useQuery(GET_STORE, {
      variables: { storeId },
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div>
        <h1>{data.getStore.name}</h1>
        <ul>
          {data.getStore.items.map(item => (
            <li key={item.id}>{item.name} - ${item.cost}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default StoreComponent;
  