import { useEffect } from 'react'
import { Alert, Table } from 'antd'

import { useTypedStoreActions, useTypedStoreState } from '../store/hooks'
import { Loader } from '../components/routing/loader'

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username'
    },
    {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
        key: 'createdAt'
    }
]

const CustomersPage = () => {
    const {error} = useTypedStoreState(state => state.global)
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
            (
                error
                    ?
                    <Alert message={error} type="error"/>
                    :
                    (
                        customers
                            ?
                            <Table dataSource={customers} columns={columns} rowKey={record => record.id}/>
                            :
                            <h1>No customers data</h1>
                    )
            )

    )
}

export { CustomersPage }