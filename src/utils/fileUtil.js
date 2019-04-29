const getFileIconName = (type) => {
    switch (type) {
    case 'rar':
    case 'zip':
    case 'archive':
        return 'archive'
    case 'pdf':
        return 'pdf'
    case 'rm':
    case 'avi':
    case 'video':
        return 'video'
    case 'xls':
    case 'excel':
        return 'excel'
    case 'doc':
    case 'word':
        return 'word'
    case 'png':
    case 'jpg':
    case 'image':
        return 'image'
    case 'txt':
    case 'text':
        return 'text'
    default:
        return 'default'
    }
}

export {getFileIconName}
