import { useEffect } from 'react'
import { useTypedStoreActions, useTypedStoreState } from '../store/hooks'
import { Loader } from '../components/routing/loader'
import { Table } from 'antd'

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

const CustomersPage = () => {
    const {loading, customers} = useTypedStoreState(state => state.customers)
    const {getCustomers} = useTypedStoreActions(actions => actions.customers)

    useEffect(() => {
        getCustomers()
    }, [])

    return (
        loading
            ?
            <Loader/>
            :
            (customers
                    ?
                    <Table dataSource={customers} columns={columns} rowKey={record => record.id}/>
                    :
                    <h1>No customers data</h1>
            )

    )
}

export { CustomersPage }