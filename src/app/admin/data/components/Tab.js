'use client'
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react';
import { Tabs } from 'antd';
import JupyterFIle from "@/app/admin/data/components/JupyterFIle";
const DraggableTabNode = ({ className, ...props }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: props['data-node-key'],
    });
    const style = {
        ...props.style,
        transform: CSS.Transform.toString(
            transform && {
                ...transform,
                scaleX: 1,
            },
        ),
        transition,
        cursor: 'move',
    };
    return React.cloneElement(props.children, {
        ref: setNodeRef,
        style,
        ...attributes,
        ...listeners,
    });
};
const Tab_Data = () => {
    const [items, setItems] = useState([
        {
            key: '1',
            label: 'Jupyter files',
            children: <JupyterFIle />,
        },
        {
            key: '2',
            label: 'Sample dataset',
            children: 'Sample dataset',
        },
        {
            key: '3',
            label: 'Sample analysis',
            children: 'Sample analysis',
        },
    ]);
    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setItems((prev) => {
                const activeIndex = prev.findIndex((i) => i.key === active.id);
                const overIndex = prev.findIndex((i) => i.key === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };
    return (
        <Tabs
            size={'large'}
            items={items}
            renderTabBar={(tabBarProps, DefaultTabBar) => (
                <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                    <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
                        <DefaultTabBar {...tabBarProps}>
                            {(node) => (
                                <DraggableTabNode {...node.props} key={node.key}>
                                    {node}
                                </DraggableTabNode>
                            )}
                        </DefaultTabBar>
                    </SortableContext>
                </DndContext>
            )}
        />
    );
};
export default Tab_Data;