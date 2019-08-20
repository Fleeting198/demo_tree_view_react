import React from 'react';
import { Item } from '../interfaces'
import EditableLabel from '../common/EditableLabel'
import style from './treeItem.module.css'

interface Props {
    item: Item
    onDeleteItem: (item: Item) => void
    onMakeFolder: (item: Item) => void
    isRoot: boolean
}
interface State {
    isOpen: boolean
    isFolder: boolean
    item: Item
    changed: boolean
}

export default class TreeItem extends React.Component<Props, State>{
    private child2Key: Map<Item, number> = new Map()
    private key2Child: Map<number, Item> = new Map()

    constructor(props: Props) {
        super(props)
        let { item } = this.props
        this.state = {
            isOpen: false,
            item: item,
            isFolder: item.children !== undefined && item.children.length > 0,
            changed: false,
        }
        this.handleDeleteItem = this.handleDeleteItem.bind(this)
        this.handleRename = this.handleRename.bind(this)
        this.handleMakeFolder = this.handleMakeFolder.bind(this)
        this.makeFolder = this.makeFolder.bind(this)
        this.toggle = this.toggle.bind(this)
        this.addItem = this.addItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    // 切换子结点显示
    toggle() {
        if (this.state.isFolder) {
            this.setState({ isOpen: !this.state.isOpen })
        }
    }

    // 组件删除自己
    deleteItem() {
        this.props.onDeleteItem(this.props.item)
    }

    // 传给子组件, 子组件删除自己时调用这个回调函数
    // 在子结点列表中寻找要删除的数据并删除, 然后重新渲染
    handleDeleteItem(itemToDelete: Item) {
        let item = this.state.item
        for (let i = 0; i < item.children!.length; i++) {
            const child = item.children![i]
            if (child === itemToDelete) {
                item.children!.splice(i, 1)
                break
            }
        }
        this.setState({ changed: !this.state.changed })
    }

    addItem() {
        this.state.item.children!.push({ name: 'new item' })
        this.setState({ changed: !this.state.changed })
    }

    handleRename(val: string) {
        let { item } = this.state;
        item.name = val
        this.setState({
            item: item
        })
    }

    handleMakeFolder(item: Item) {
        this.props.onMakeFolder(item)
    }

    makeFolder() {
        if (!this.state.isFolder) {
            this.props.onMakeFolder(this.props.item)
            this.setState({
                isFolder: true,
                isOpen: true
            })
        }
    }

    renderChildrenItems(): any[] {
        let childListItems: any[] = []
        let children: Item[] = this.state.item.children!
        // if (this.state.isFolder && this.state.isOpen) {
        if (this.state.isFolder) {
            for (let i = 0; i < children.length; i++) {
                const child: Item = children[i]
                // decide key
                let key: number | undefined = this.child2Key.get(child)
                if (key === undefined) {
                    key = 0
                    while (1) {
                        if (this.key2Child.has(key)) {
                            key++
                        } else {
                            break
                        }
                    }
                    this.child2Key.set(child, key)
                    this.key2Child.set(key, child)
                }
                childListItems.push((
                    <TreeItem
                        item={child}
                        key={key}
                        onDeleteItem={this.handleDeleteItem}
                        onMakeFolder={this.handleMakeFolder}
                        isRoot={false}
                    />
                ))
            }
            childListItems.push((
                <li className={style.add} key="add" onClick={() => this.addItem()}>+</li>
            ))
        }
        return childListItems
    }

    render() {
        const { isFolder, isOpen } = this.state;
        const childListItems = this.renderChildrenItems();
        const childList = (
            <ul style={{ display: this.state.isOpen ? "inline-block" : "none" }} >
                {childListItems}
            </ul>);
        const iconIsOpen = isFolder ?
            (<span className="itemAction">[ {isOpen ? '-' : '+'} ]</span>)
            : null;

        // TODO: 删除文件夹之前警告或者禁止删除文件夹, 如果是根组件则禁止删除, 虽然目前删除的功能无效的, 
        // 即触发删除事件也无事发生, 但是显示层面上最好还是区分一下
        const actionDelete = !this.props.isRoot ?
            (<span className="itemAction" onClick={this.deleteItem}>[ x ]</span>)
            : null

        return (
            <li className={style.treeItem}>
                <div
                    className={isFolder ? 'bold' : ''}
                    onDoubleClick={this.makeFolder}
                >
                    <span className={style.name} onClick={this.toggle}>
                        <EditableLabel
                            text={this.state.item.name}
                            onChange={this.handleRename}
                        />
                        {iconIsOpen}
                    </span>

                    {actionDelete}
                </div>
                {childList}
            </li>
        );
    }
}
