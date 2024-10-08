import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import { CREATE_STORE } from '../../utils/mutations';

const CreateStoreForm = () => {
    const [storeName, setStoreName] = useState('');
    const [storeDescription, setStoreDescription] = useState('');
    const [createStore] = useMutation(CREATE_STORE);

    const handleCreateStore = async (e) => {
        e.preventDefault();

        try {
            const {data} = await createStore({
                variables: {name:storeName, description:storeDescription},
            });
            console.log('Store created:', data.createStore)
            setStoreName(' ');
            setStoreDescription(' ');
        } catch (error) { 
            console.error('Error creating store:', error)
        }
    };

    return (
        <div>
            <h2>Create a New Store</h2>
            <input 
            type='text'
            placeholder='Store Name'
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            />
            <input
            type='text'
            placeholder='Store Description'
            value={storeDescription}
            onChange={(e) => setStoreDescription(e.target.value)}
            />
            <button onClick={handleCreateStore}>Create Store</button>
        </div>
    )
}

export default CreateStoreForm;