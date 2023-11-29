'use client'
import React, {useState} from 'react'


const DynamicSection = () => {
    const [items, setItems] = useState([
        {id: 1, title: '', description: '', preview: null}
    ]);

    const addItem = () => {
        setItems([...items, {id: items.length + 1, title: '', description: '', preview: null}]);
    };

    const updateItem = (id, updatedItem) => {
        setItems(
            items.map((item) => {
                if (item.id === id) {
                    return updatedItem;
                } else {
                    return item;
                }
            })
        );
    };

    const deleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const handleImage = (e, id) => {
        const file = e.target.files[0];
        const updatedItem = {...items.find((item) => item.id === id)};
        updatedItem.preview = URL.createObjectURL(file);

        updateItem(id, updatedItem);
    };

    console.log(items)

    return (
        <div className={'flex flex-col justify-end items-end w-[80%]'}>
            {items.map((item, index) => (
                <div key={item.id} className="my-4 flex flex-col w-full mt-10">
                    <div className={`flex items-start ${item.id %2 !== 1 ? 'flex-row-reverse justify-end gap-10' : 'justify-between'}`}>
                        <div>
                            <p className="text-2xl font-bold text-text-color">{item.title || 'Header'}</p>
                            <p className={'text-lg text-description-color'}>{item.description || 'Description'}</p>
                        </div>
                        <input
                            className={'hidden'}
                            id={`importImage-${index}`}
                            type={'file'}
                            onChange={(e) => handleImage(e, item.id)}
                        />
                        <label htmlFor={`importImage-${index}`}>
                            <img
                                src={item.preview ? item.preview : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
                                alt="File Preview"
                                className="mt-2 max-w-xs"
                            />
                        </label>
                    </div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={item.title}
                        onChange={(e) => updateItem(item.id, { ...item, title: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mt-2"
                    />
                    <textarea
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, { ...item, description: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 mt-2"
                    ></textarea>

                    <button
                        onClick={() => deleteItem(item.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                    >
                        Delete Item
                    </button>
                </div>
            ))}
            <button
                className="bg-green-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded"
                onClick={addItem}
            >
                Add Item
            </button>
        </div>
    );
};
export default DynamicSection;
