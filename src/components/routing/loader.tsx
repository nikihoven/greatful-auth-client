import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Loader = () => {

    return (
        <Spin
            className="loader"
            indicator={<LoadingOutlined style={{fontSize: 100}} spin/>}
        />
    )
}

export { Loader }