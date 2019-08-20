import React from 'react'
import { Item } from '../interfaces'
import TreeItem from './TreeItem'
import style from './treeList.module.css'

interface Props {
    treeData: Item
}

export default class TreeList extends React.Component<Props, {}>{
    constructor(props: Props) {
        super(props)
        this.handleDeleteItem = this.handleDeleteItem.bind(this)
        this.handleMakeFolder = this.handleMakeFolder.bind(this)
    }
    handleDeleteItem(item: Item) {
        // TODO: 禁止删除树中的根结点? 所以传入回调但是不实现功能
    }
    handleMakeFolder(item: Item) {
        item.children = []
        this.handleAddItem(item)
    }
    handleAddItem(item: Item) {
        item.children!.push({
            name: 'new item'
        })
    }
    render() {
        return (
            <ul className={style.treeList}>
                <TreeItem
                    item={this.props.treeData}
                    onDeleteItem={this.handleDeleteItem}
                    onMakeFolder={this.handleMakeFolder}
                    isRoot={true}
                />
            </ul>)
    }
}
