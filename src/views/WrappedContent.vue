<template>
    <router-view/>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import {MessageApiInjection} from 'naive-ui/lib/message/src/MessageProvider';
import {useDialog, useMessage, useNotification} from 'naive-ui';
import {DialogApiInjection} from 'naive-ui/es/dialog/src/DialogProvider';
import {NotificationApiInjection} from 'naive-ui/es/notification/src/NotificationProvider';

declare global {
    interface Window {
        $message: MessageApiInjection;
        $dialog: DialogApiInjection;
        $notification: NotificationApiInjection;
    }
}
export default defineComponent({
    name: 'wrapped-content',
    setup() {
        window.$message = useMessage();
        window.$dialog = useDialog();
        window.$notification = useNotification();
    },
});
</script>
