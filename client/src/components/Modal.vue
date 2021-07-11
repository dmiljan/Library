<template>
    <teleport to="body">
        <div ref="modal" 
            :class="{'show': show, 'fade': transitionDuration > 0}" 
            @click.self="onBackdropClick"
            class="modal" 
            tabindex="-1"
            aria-hidden="true">
            <div class="modal-dialog" :class="modalSizeClass" role="document">
                <div class="modal-content">
                    <div v-if="loading" class="text-center loading">
                        <span class="fas fa-circle-notch fa-spin mr-2"></span> Loading...
                    </div>
                    <div v-if="header" class="modal-header">
                        <h5 class="modal-title">
                            <slot name="title">{{ title }}</slot>
                        </h5>
                        <button @click="closeModal" 
                            type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot/>
                    </div>
                    <div v-if="footer" class="modal-footer">
                        <slot name="footer" />
                    </div>
                </div>
            </div>
            <div ref="backdropEl" class="modal-backdrop" :class="{show, fade:transitionDuration > 0}"></div>
        </div>
    </teleport>
</template>

<script>
import {computed, onMounted, onUnmounted, ref, watch} from "vue"
import {removeFromDom} from "./../utils/html"

export default {
    name: "Modal",
    emits: ['close', 'show', 'hide'],
    props: {
        show: Boolean,
        title: String,
        size: String,
        backdrop: {
            type: Boolean,
            default: true
        },
        footer: {
            type: Boolean,
            default: false
        },
        header: {
            type: Boolean,
            default: true
        },
        transitionDuration: {
            type: Number,
            default: 150
        },
        keyboard: {
            type: Boolean,
            default: true
        },
        loading: {
            type: Boolean,
            default: false,
        }
    },
    setup(props, {emit}) {
        const backdropEl = ref(null)
        const modal = ref(null)

        // var model = document.getElementById('modal');

        var timeout = 0;

        const closeModal = () => emit('close')

        const onKeyPress = (event) => {
            if (props.keyboard && props.show && event.key === 'Escape') {
                closeModal()
            }
        }

        const onBackdropClick = () => {
            if (props.backdrop) {
                closeModal()
            }
        }

        onMounted(() => {
            removeFromDom(backdropEl.value)
            window.addEventListener('keyup', onKeyPress)
        })

        onUnmounted(() => {
            clearTimeout(timeout)
            removeFromDom(backdropEl.value)
            removeFromDom(modal.value)
            window.removeEventListener('keyup', onKeyPress)
        })

        watch(() => props.show, value => {
            clearTimeout(timeout)

            if(value) {
                document.body.appendChild(backdropEl.value)
                document.body.appendChild(modal.value)
                modal.value.style.display = 'block'
                modal.value.scrollTop = 0

                timeout = setTimeout(() => {
                    emit('show')
                    timeout = 0
                }, props.transitionDuration)
            } else {
                timeout = setTimeout(() => {
                    modal.value.style.display = 'none'
                    removeFromDom(backdropEl.value)
                    removeFromDom(modal.value)
                    emit('hide')
                    timeout = 0
                }, props.transitionDuration)
            }
        })

        const modalSizeClass = computed(() => {
            return {[`modal-${props.size}`]: Boolean(props.size)};
        })

        return {
            backdropEl,
            modal,
            closeModal,
            onBackdropClick,
            modalSizeClass
        }
    }
}
</script>
